DEBUG = false

# состояния: 0 (выкл), 1 (вкл) и -1 (Z-состояние)
ONE = value: 1, text: "1", color: "#f5bb15"
NULL = value: 0, text: "0", color: "#15bbf5"
Z = value: -1, text: "Z", color: "#f515bb"

state_from_value = (value) ->
    if not value
        state = NULL
    else if value > 0
        state = ONE
    else state = Z
    return state

dark = (color) ->
    switch color
        when "#f5bb15" then "#b38400"
        when "#15bbf5" then "#0084b3"
        when "#f515bb" then "#b30084"
        else "#000"

#  outputs text on ctx 
draw_text = (ctx, x, y, text) ->
    ctx.fillStyle = "#000"
    ctx.textAlign = 'left'
    ctx.fillText(text, x, y)

#  clears canvas 
clear = (ctx) ->
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)


class Node
    constructor: (@ctx, @x, @y) ->
        @visible=false
        @state=Z
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
        # не очень хорошая реализация ломаных проводов
        # провод ломается посередине
        if (@start_node.x is @end_node.x) or (@start_node.y is @end_node.y)
            @ctx.beginPath()
            @ctx.rect(@start_node.x-2, @start_node.y-2, @end_node.x-@start_node.x+4, @end_node.y-@start_node.y+4)
            @ctx.closePath()
            @ctx.fill()
            @ctx.stroke()
        else
            width = @end_node.x-@start_node.x
            height = @end_node.y-@start_node.y
            @ctx.beginPath()
            @ctx.rect(@start_node.x-2, @start_node.y-2, width/2, 4)
            @ctx.rect(@start_node.x-2 + width/2, @start_node.y + 2, 4, height/Math.abs(height)*(Math.abs(height)+4))
            @ctx.rect(@start_node.x+2+width/2, @start_node.y-2 + height, width/2, 4)
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
        #@out.element = this

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
        #@out.element = this

    sync: ->
        if (@in_0.state is Z) or (@in_1.state is Z)
            @out.state = NULL
        else
            @out.state = state_from_value(@in_0.state.value * @in_1.state.value)
        @out.connected = true
    
    is_ready: ->
        return @in_0.connected and @in_1.connected

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
class Or
    constructor: (@ctx, @in_0, @in_1, @out) ->
        @name = "Or"
        @in_0.element = this
        @in_1.element = this
        #@out.element = this

    sync: ->
        if (@in_0.state is Z) and (@in_1.state is Z)
            @out.state = Z
        else
            @out.state = state_from_value(Math.max(@in_0.state.value, @in_1.state.value))
        @out.connected = true

    is_ready: ->
        return @in_0.connected and @in_1.connected

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


# simple examples 
# example 1: "1" and not "1" 

draw_scheme = (ctx) ->
    clear(ctx)
    ctx.font = '11pt PT Sans'
    ctx.textBaseline = 'middle'
    nodes = [ new Node(ctx,  50, 40)
        , new Node(ctx, 100, 40)
        , new Node(ctx, 153, 40)
        , new Node(ctx, 210, 40)
        , new Node(ctx,  50, 85)
        , new Node(ctx, 210, 70)
        , new Node(ctx, 270, 55)
        , new Node(ctx, 320, 55) ]  
    input = [ new Input(ctx, nodes[0])
            , new Input(ctx, nodes[4]) ] 
    wires = [ new Wire(ctx, nodes[0], nodes[1])
            , new Wire(ctx, nodes[2], nodes[3])
            , new Wire(ctx, nodes[4], nodes[5])
            , new Wire(ctx, nodes[6], nodes[7]) ]
    logics = [ new Not(ctx, nodes[1], nodes[2])
             , new And(ctx, nodes[3], nodes[5], nodes[6]) ]
    output = [ new Output(ctx, nodes[7]) ]
    
    input[0].set_state(NULL)
    input[1].set_state(ONE)

    connected_nodes = []
    for inp in input
        connected_nodes.push(inp.node)
    for i in [0..nodes.length-1]
        node = connected_nodes[i]
        console.log(i, connected_nodes) if DEBUG
        if node.element isnt false
            console.log(node.element.name, node.element.is_ready()) if DEBUG
            if node.element.is_ready()
                node.element.sync()
                console.log(node.element.out) if DEBUG
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

draw_scheme(document.getElementById('examples').getContext('2d'))
