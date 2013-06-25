# состояния: 0 (выкл), 1 (вкл) и -1 (Z-состояние)
ONE = value: 1, text: "1", color: "#f5bb15"
NULL = value: 0, text: "0", color: "#15bbf5"
Z = value: -1, text: "Z", color: "#f515bb"

dark = (color) ->
    switch color
        when "#f5bb15" then "#b38400"
        when "#15bbf5" then "#0084b3"
        else "#b30084"

state_from_value = (value) ->
    if not value
        state = NULL
    else if value > 0
        state = ONE
    else state = Z
    return state

class Node
    constructor: (@ctx, @x, @y) ->
        @visible=false
        @state=NULL
        @connected=false
        @wires=[]
        @element=false

    add_wire: (wire) ->
        @wires.push(wire)

    get_wires: ->
        return @wires

    draw: ->
        if @visible
            @ctx.strokeStyle = dark(@state.color)
            @ctx.fillStyle = @state.color
            @ctx.lineWidth = 1
            @ctx.beginPath()
            @ctx.arc(@x, @y, 4, 0, Math.PI * 2, true)
            @ctx.closePath()
            @ctx.fill()
            @ctx.stroke()


class Wire
    constructor: (@ctx, @start_node, @end_node) ->
        @start_node.add_wire(this)
        @end_node.add_wire(this)        

    link: ->
        @end_node.state = @start_node.state
        @end_node.connected = true

    draw: ->
        @ctx.strokeStyle = dark(@end_node.state.color)
        @ctx.lineWidth = 1
        @ctx.fillStyle = @end_node.state.color
        @ctx.beginPath()
        @ctx.rect(@start_node.x-2, @start_node.y-2, @end_node.x-@start_node.x+4, @end_node.y-@start_node.y+4)
        @ctx.closePath()
        @ctx.fill()
        @ctx.stroke()


# logical input: 1 or 0 
class Input
    constructor: (@ctx, @node) ->
    
    sync: ->
        @node.state = @state
        @node.connected = true
    
    set_state: (state) ->
        @state = state
        @sync()

    draw: ->
        @ctx.lineWidth = 1
        @ctx.strokeStyle = dark(@node.state.color)
        @ctx.fillStyle = @node.state.color
        @ctx.beginPath()
        @ctx.arc(@node.x, @node.y, 11, 0, Math.PI * 2, true)
        @ctx.closePath()
        @ctx.fill()
        @ctx.stroke()
        @ctx.fillStyle = '#000'
        @ctx.textAlign = 'center'  
        @ctx.fillText(@state.text, @node.x, @node.y)


# logical output
class Output
    constructor: (@ctx, @node) ->

    sync: ->    
        @state = @node.state
        @node.connected = true
    
    draw: ->
        @ctx.beginPath()
        @ctx.arc(@node.x, @node.y, 11, 0, Math.PI * 2, true)
        @ctx.closePath()
        @ctx.fillStyle = @node.state.color
        @ctx.fill()
        @ctx.lineWidth = 1
        @ctx.strokeStyle = dark(@node.state.color)
        @ctx.stroke()
        @ctx.fillStyle = '#000'
        @ctx.textAlign = 'center'
        @ctx.fillText(@state.text, @node.x, @node.y)


#  logical function: x1 = not x0 
class Not
    constructor: (@ctx, @in, @out) ->
        @name = "Not"
        @in.element = this
        @out.element = this

    sync: ->
        switch @in.state
            when ONE then @out.state = NULL
            when NULL then @out.state = ONE
            else @out.state = Z
        @out.connected = true
    
    is_ready: ->
        return @in.connected

    draw: ->
        @ctx.beginPath()
        @ctx.lineWidth = 2
        @ctx.strokeStyle = '#000'
        @ctx.moveTo(@in.x, @in.y)
        @ctx.lineTo(@in.x, @in.y - 23)
        @ctx.lineTo(@in.x + 46, @in.y)
        @ctx.lineTo(@in.x, @in.y + 23)
        @ctx.lineTo(@in.x, @in.y)
        @ctx.closePath()
        @ctx.moveTo(@in.x + 60, @in.y)
        @ctx.arc(@in.x + 53, @in.y, 7, 0, Math.PI * 2, true)
        @ctx.stroke()
        @ctx.beginPath()
        @ctx.arc(@in.x + 53, @in.y, 6, 0, Math.PI * 2, true)
        @ctx.closePath()
        @ctx.fillStyle = @out.state.color
        @ctx.fill()
        @in.visible = true
        @in.draw()
        #  viewable width of block = 60, X'able width of block = 53


#  logical function: x1 = x0_0 and x0_1 
class And
    constructor: (@ctx, @in_0, @in_1, @out) ->
        @name = "And"
        @in_0.element = this
        @in_1.element = this
        @out.element = this

    sync: ->
        if (@in_0.state is Z) or (@in_1.state is Z)
            @out.state = NULL
        else
            @out.state = state_from_value(@in_0.state.value * @in_1.state.value)
        @out.connected = true
    
    is_ready: ->
        return @in_0.get_wires()[0].connected and @in_1.get_wires()[0].connected

    draw: ->
        @ctx.strokeStyle = '#000'
        @ctx.lineWidth = 2
        @ctx.beginPath()
        @ctx.moveTo(@in_0.x, @in_0.y)
        @ctx.lineTo(@in_0.x, @in_0.y - 10)
        @ctx.lineTo(@in_0.x + 35, @in_0.y - 10)
        @ctx.bezierCurveTo(@out.x + 8, @out.y - 20, @out.x + 8,
                             @out.y + 20, @in_0.x + 35, @in_1.y + 10)
        @ctx.lineTo(@in_0.x, @in_1.y + 10)
        @ctx.lineTo(@in_0.x, @in_0.y)
        @ctx.closePath()
        @ctx.stroke()
        @in_0.visible = true
        @in_0.draw()
        @in_1.visible = true
        @in_1.draw()
        @out.visible = true
        @out.draw()
        #  width of block = 60 


#  logical function: x1 = x0_0 or x0_1 
class OR
    constructor: (@ctx, @in_0, @in_1, @out) ->
        if (@in_0.state is Z) and (@in_1.state is Z)
            @out.state = Z
        else if (@in_0.state is Z) and (@in_1.state isnt Z)
            @out.state = @in_1.state
        else if (@in_0.state isnt Z) and (@in_1.state is Z)
            @out.state = @in_0.state
        else
            @out.state = state_from_value(@in_0.state.value + @in_1.state.value)

    draw: ->
        @ctx.strokeStyle = '#000'
        @ctx.lineWidth = 2
        @ctx.beginPath()
        @ctx.moveTo(@in_0.x - 10, @in_0.y - 10)
        @ctx.bezierCurveTo(@in_0.x + 8, @out.y - 20, @in_0.x + 8,
                             @out.y + 20, @in_0.x - 10, @in_1.y + 10)
        @ctx.bezierCurveTo(@in_0.x + 30, @in_1.y + 10, @out.x - 15,
                             @out.y + 20, @out.x, @out.y)
        @ctx.moveTo(@in_0.x - 10, @in_0.y - 10)
        @ctx.bezierCurveTo(@in_0.x + 30, @in_0.y - 10, @out.x - 15,
                             @out.y - 20, @out.x, @out.y)
        @ctx.moveTo(@in_0.x - 10, @in_0.y - 10)
        @ctx.closePath()
        @ctx.stroke()
        
        @in_0.visible = true
        @in_0.draw()
        @in_1.visible = true
        @in_1.draw()
        @out.visible = true
        @out.draw()
        # viewable width of block ~ 70, X'able width of block = 60 


#  JK flip-flop 
class JK
    constructor: (@ctx, @J, @K, @C, @Q=NULL) ->
        if @C.state
            if (@J.state is Z) or (@K.state is Z)
                @Q.state = Z
            else
                @Q.state = state_from_value((1-@Q.state.value)*@J.state.value + @Q.state.value*(1-@K.state.value))
                # тут возможны проблемы с Z-состоянием на выходе

    draw: ->
        @ctx.strokeStyle = '#000'
        @ctx.lineWidth = 2
        @ctx.textAlign = 'center'
        @ctx.strokeRect(@J.x, @J.y - 20, 60, 100)
        @ctx.fillStyle = "#000"
        @ctx.fillText("J", @J.x + 10, @J.y)
        @ctx.fillText("K", @K.x + 10, @K.y)
        @ctx.fillText("C", @C.x + 10, @C.y)
        @ctx.fillText("Q", @Q.x - 11, @Q.y)
        @ctx.fillText("JK", @J.x + 30, @C.y)
        @ctx.lineWidth = 0.3
        @ctx.beginPath()
        @ctx.moveTo(@J.x + 18, @J.y - 20)
        @ctx.lineTo(@J.x + 18, @K.y + 20)
        @ctx.moveTo(@Q.x - 18, @K.y + 20)
        @ctx.lineTo(@Q.x - 18, @J.y - 20)
        @ctx.moveTo(@Q.x - 18, @K.y - 20)
        @ctx.closePath()
        @ctx.stroke()
        @J.visible = true
        @J.draw()
        @K.visible = true
        @K.draw()
        @C.visible = true
        @C.draw()
        @Q.visible = true
        @Q.draw()


#  RS flip-flop 
class RS
    constructor: (@ctx, @S, @R, @C, @Q=NULL) ->
        if @C.state
            if (@R.state is Z) or (@S.state is Z) or (@R.state is ONE) and (@S.state is ONE)
                @Q.state = Z
            else
                @Q.state = @S.state

    draw: ->
        @ctx.strokeStyle = '#000'
        @ctx.lineWidth = 2
        @ctx.textAlign = 'center'
        @ctx.strokeRect(@S.x, @S.y - 20, 60, 100)
        @ctx.fillStyle = "#000"
        @ctx.fillText("S", @S.x + 10, @S.y)
        @ctx.fillText("R", @R.x + 10, @R.y)
        @ctx.fillText("C", @C.x + 10, @C.y)
        @ctx.fillText("Q", @Q.x - 11, @Q.y)
        @ctx.fillText("RS", @S.x + 30, @C.y)
        @ctx.lineWidth = 0.3
        @ctx.beginPath()
        @ctx.moveTo(@S.x + 18, @S.y - 20)
        @ctx.lineTo(@S.x + 18, @R.y + 20)
        @ctx.moveTo(@Q.x - 18, @R.y + 20)
        @ctx.lineTo(@Q.x - 18, @S.y - 20)
        @ctx.moveTo(@Q.x - 18, @R.y - 20)
        @ctx.closePath()
        @ctx.stroke()
        @S.visible = true
        @S.draw()
        @R.visible = true
        @R.draw()
        @C.visible = true
        @C.draw()
        @Q.visible = true
        @Q.draw()


class BTRI
    constructor: (@ctx, @in, @oen, @out) ->
        if (@oen.state is NULL) or (@oen.state is Z)
            @out.state = @in.state
        else @out.state = Z
    
    draw: ->
        if @oen.state is Z
            @ctx.fillStyle = ONE.color
            @ctx.strokeStyle = Z.color
        else
            @ctx.fillStyle = if @oen.state is NOT then ONE.color else NULL.color
            @ctx.strokeStyle = @ctx.fillStyle
        @ctx.beginPath()
        @ctx.lineWidth = 4
        @ctx.moveTo(@oen.x, @oen.y)
        @ctx.lineTo(@in.x + 15, @in.y + 10)
        @ctx.closePath()
        @ctx.stroke()
        @ctx.beginPath()
        @ctx.lineWidth = 2
        @ctx.strokeStyle = '#000'
        @ctx.moveTo(@in.x, @in.y)
        @ctx.lineTo(@in.x, @in.y - 16)
        @ctx.lineTo(@in.x + 30, @in.y)
        @ctx.lineTo(@in.x, @in.y + 16)
        @ctx.lineTo(@in.x, @in.y)
        @ctx.closePath()
        @ctx.moveTo(@in.x + 15, @in.y + 10)
        @ctx.arc(@in.x + 15, @in.y + 10, 5, 0, Math.PI * 2, true)
        @ctx.stroke()
        @ctx.beginPath()
        @ctx.arc(@in.x + 15, @in.y + 10, 4, 0, Math.PI * 2, true)
        @ctx.closePath()
        @ctx.fill()
        @in.visible = true
        @in.draw()
        @out.visible = true
        @out.draw()        
        @oen.visible = true
        @oen.draw()        
        #  width of block = 30 


#  outputs text on @ctx 
draw_text = (ctx, x, y, text) ->
    ctx.fillStyle = "#000"
    ctx.textAlign = 'left'
    ctx.fillText(text, x, y)


#  clears canvas 
clear = (ctx) ->
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

# simple examples 
# example 1: "1" and not "1" 

ctx = document.getElementById('examples').getContext('2d')
ctx.font = '11pt PT Sans'
ctx.textBaseline = 'middle'

wires = []
el = []
nodes = [new Node(ctx, 50, 40), new Node(ctx, 100, 40),
new Node(ctx, 153, 40), new Node(ctx, 210, 40),
new Node(ctx, 50, 85), new Node(ctx, 170, 85, 1),
new Node(ctx, 170, 70, 1), new Node(ctx, 210, 70),
new Node(ctx, 270, 55), new Node(ctx, 320, 55)]  
# draw_text(ctx, 155, 15, '"1" и не "1"')
input = [new Input(ctx, nodes[0]), new Input(ctx, nodes[4])] 
wires = [ new Wire(ctx, nodes[0], nodes[1])
        , new Wire(ctx, nodes[2], nodes[3])
        , new Wire(ctx, nodes[4], nodes[5])
        , new Wire(ctx, nodes[5], nodes[6])
        , new Wire(ctx, nodes[6], nodes[7])
        , new Wire(ctx, nodes[8], nodes[9])]
logics = [ new Not(ctx, nodes[1], nodes[2])
         , new And(ctx, nodes[3], nodes[7], nodes[8])]
output = [new Output(ctx, nodes[9])]

clear(ctx)                      # clearing ctx
input_data = [ONE, NULL]
inp.set_state(input_data[0]) for inp in input
connected_nodes = []
for inp in input
    connected_nodes.push(inp.node)
for i in [0..nodes.length-1]
    node = connected_nodes[i]
    if node.element isnt false
        if node.element.is_ready()
            node.element.sync()
            connected_nodes.push(node.element.out)
    else
        for wire in node.get_wires()
            if not wire.end_node.connected
                wire.link()
                connected_nodes.push(wire.end_node)
out.sync() for out in output
# сначала проставляем состояния
wire.draw() for wire in wires   # drawing all wires below everything else
elem.draw() for elem in input
elem.draw() for elem in logics
elem.draw() for elem in output
node.draw() for node in nodes
