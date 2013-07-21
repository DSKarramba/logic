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
