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

state_from_value: (value) ->
    switch (value)
        when -2 then OFF
        when -1 then Z
        when 0 then NULL
        when 1 then ONE
        else undefined

invert: (state) ->
    switch (state)
        when NULL then ONE
        when ONE then NULL
        else state
