DEBUG = false

###
Состояния:
    * 0 (логический 0),
    * 1 (логическая 1),
    * -1 (Z-состояние),
    * -2 (питания нет).
###
NULL = value:  0, text: "0", color: "#15bbf5"
ONE  = value:  1, text: "1", color: "#f5bb15"
Z    = value: -1, text: "Z", color: "#f515bb"
OFF  = value: -2, text:  "", color: "#000"

state_from_value = (value) ->
    switch (value)
        when -2 then OFF
        when -1 then Z
        when 0 then NULL
        when 1 then ONE
        else undefined

invert = (state) ->
    switch (state)
        when NULL then ONE
        when ONE then NULL
        else state

dark = (color) ->
    switch color
        when "#f5bb15" then "#b38400"
        when "#15bbf5" then "#0084b3"
        when "#f515bb" then "#b30084"
        else "#000"

#  outputs text on ctx 
draw_text = (x, y, text) ->
    ctx.fillStyle = "#000"
    ctx.textAlign = 'left'
    ctx.fillText(text, x, y)

#  clears canvas 
clear = (ctx) ->
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

# соберём все выводы в схеме
collect_nodes = (elements) ->
    nodes = []
    for element in elements
        nodes.concat(element.get_input())
        nodes.concat(element.get_output())

class Node
    constructor: () ->
        @_element=false
        @_inverted=false
        @_connected=false
        @_state=OFF
        @_wires=[]        
        @_coordinates={}
        @_radius=4

    add_wire: (wire) ->
        @_wires.push(wire)

    get_wires: ->
        return @_wires

    connect: ->
        @_connected = true

    is_connected: ->
        return @_connected

    is_inverted: ->
        return @_inverted

    set_coordinates: (point) ->
        @_coordinates = point

    get_coordinates: ->
        return @_coordinates

    set_state: (state) ->
        @_state = state

    get_state: ->
        return @_state

    draw: (ctx) ->
        if @_inverted
            ctx.strokeStyle = OFF.color
        else
            ctx.strokeStyle = dark(@_state.color)
        ctx.fillStyle = @_state.color
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(@_coordinates.x, @_coordinates.y, @_radius, 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()


class Wire
    constructor: (@_start, @_end) ->
        @_start.add_wire(this)
        @_end.add_wire(this)        

    sync: ->
        if @_end.is_inverted()
            @_end.set_state(invert(@_start.get_state()))
        else
            @_end.set_state(@_start.get_state())
        @_end_node.connect()

    draw: (ctx) ->
