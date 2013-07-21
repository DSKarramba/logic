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
