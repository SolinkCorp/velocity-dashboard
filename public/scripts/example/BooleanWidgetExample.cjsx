React = require 'react'
_ = require 'underscore'
chartColors = require('./ChartStyles').colors

module.exports =
    Content: ->
        <div>
            <div className='widgetBody'>
                <i className="zmdi zmdi-thumb_up"></i>
            </div>
        </div>
    Preview: ->
        <div>
            <div className='widgetBody'>
                <i className="zmdi zmdi-thumb_up preview"></i>
            </div>
        </div>
