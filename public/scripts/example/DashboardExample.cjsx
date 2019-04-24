React = require 'react'
{Dashboard, Widget, Config, Content} = require '../dashboard'
weatherWidget = require './weatherWidget'
_ = require 'underscore'
pieChart = require './PieChartExample'
barChart = require './BarChartExample'
activityWidget = require './ActivityExample'
booleanWidget = require './BooleanWidgetExample'

module.exports = React.createClass

    displayName: 'ExampleDashboard'

    getInitialState: ->
      config: [
        {widgetId: 'weather', instanceId: '1', config: {location: 'orl'} }
        {widgetId: 'accident', instanceId: '2'}
        {widgetId: 'weather', instanceId: '3', config: {location: 'stl'} }
        {widgetId: 'activityLog', instanceId: '9'}
        {widgetId: 'pie', instanceId: '4'}
        {widgetId: 'barChart', instanceId: '5'}
        {widgetId: 'thumbsUp', instanceId: '6'}
        {widgetId: 'nothin', instanceId: '7'}
      ]
      editMode: false

    configChange: (newConfig) ->
      @setState config: newConfig

    toggleEditMode: () ->
      @setState editMode: !@state.editMode

    render: ->
      { editMode } = @state;

      <main className='example-dash-wrapper'>
        <header>
          <button tabIndex={1} onClick={@toggleEditMode}>
            { if editMode then 'View' else 'Edit' }
          </button>
        </header>

        <Dashboard
          className='example-dash'
          config={@state.config}
          onConfigChange={@configChange}
          widgetHeight={280}
          widgetWidth={280}
          widgetMargin={16}
          titleHeight={60}
          maxColumns={8}
          editMode={editMode}
        >
          <Widget id='accident'
              contentComp={-> <div className='days-since-last'><div className='days'>13</div><div className='text'>days since last accident</div></div>}
              previewComp={-> <div className='days-since-last preview'><div className='days'>100</div><div className='text'>days since last accident</div></div>}/>
          <Widget id='weather' contentComp={weatherWidget.Content} configComp={weatherWidget.Config} previewComp={weatherWidget.Preview} />
          <Widget id='pie' contentComp={pieChart.Content} previewComp={pieChart.Preview} />
          <Widget id='barChart' width="2" contentComp={barChart.Content} />
          <Widget id='thumbsUp' contentComp={booleanWidget.Content} previewComp={booleanWidget.Preview} />
          <Widget id='nothin' width="2" />
          <Widget id='anotherEmpty' />
          <Widget id='activityLog' height="2" contentComp={activityWidget.Content}/>
          <Widget id='empty' />
          <Widget id='wideEmpty' width="2" />
        </Dashboard>
      </main>