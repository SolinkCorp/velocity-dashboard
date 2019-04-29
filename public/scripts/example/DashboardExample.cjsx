React = require 'react'
{Dashboard, Widget, Config, Content} = require '../dashboard'
weatherWidget = require './weatherWidget'
_ = require 'underscore'
pieChart = require './PieChartExample'
barChart = require './BarChartExample'
activityWidget = require './ActivityExample'
booleanWidget = require './BooleanWidgetExample'

module.exports = React.createClass

    menu: [
        {
          title: 'Settings'
          type: 'action'
          handler: (instanceId) ->
            console.warn('Settings widget ', instanceId)
        },
        {
          title: 'Remove'
          type: 'action'
          handler: (instanceId) ->
            console.warn('Remove widget ', instanceId)
        },
        {
          title: 'Export'
          type: 'action'
          handler: (instanceId) ->
            console.warn('Export data from widget ', instanceId)
        },
    ]

    displayName: 'ExampleDashboard'

    getInitialState: ->
      widgets: [
        {
          widgetId: 'weather'
          instanceId: '1'
          config: {location: 'orl', title: 'Orlando'}
        },
        {
          widgetId: 'accident'
          description: 'Lorem ipsum dolor accident'
          instanceId: '2'
        },
        {
          widgetId: 'weather'
          instanceId: '3'
          config: {location: 'stl', title: 'St. Louis'}
        },
        {
          widgetId: 'activityLog'
          description: 'Lorem ipsum dolor activityLog'
          instanceId: '9'
          config: { title: 'Activity Feed' }
        },
        {
          widgetId: 'pie'
          description: 'Lorem ipsum dolor pie'
          instanceId: '4'
          config: { title: 'My Average Day' }
        },
        {
          widgetId: 'barChart'
          description: 'Lorem ipsum dolor barChart'
          instanceId: '5'
          config: { title: 'Numbers by Date' }
        },
        {
          widgetId: 'thumbsUp'
          description: 'Lorem ipsum dolor thumbsUp'
          instanceId: '6'
          config: { title: 'System Status' }
        },
        {
          widgetId: 'nothin'
          description: 'Lorem ipsum dolor nothin'
          instanceId: '7'
          config: { title: 'Interesting Widget' }
        },
      ]
      editMode: false

    widgetsChange: (widgets) ->
      @setState widgets: widgets

    toggleEditMode: () ->
      @setState editMode: !@state.editMode

    render: ->
      { editMode } = @state;

      <main className='example-dash-wrapper'>
        <header>
          <button tabIndex={1} onClick={@toggleEditMode}>
            { if editMode then 'Done' else 'Add Widgets' }
          </button>
        </header>

        <Dashboard
          className='example-dash'
          widgets={@state.widgets}
          menu={@menu}
          onWidgetsChange={@widgetsChange}
          widgetHeight={280}
          widgetWidth={280}
          widgetMargin={16}
          titleHeight={60}
          maxColumns={8}
          editMode={editMode}
        >
          <Widget
            id='accident'
            contentComp={-> <div className='days-since-last'><div className='days'>13</div><div className='text'>days since last accident</div></div>}
            previewComp={-> <div className='days-since-last preview'><div className='days'>100</div><div className='text'>days since last accident</div></div>}
          />
          <Widget
            id='weather'
            contentComp={weatherWidget.Content}
            configComp={weatherWidget.Config}
            previewComp={weatherWidget.Preview}
            defaultConfig={{ location: 'orl', title: 'Orlando' }}
          />
          <Widget
            id='pie'
            contentComp={pieChart.Content}
            previewComp={pieChart.Preview}
            defaultConfig={{ title: 'My Average Day' }}
          />
          <Widget
            id='barChart'
            width="2"
            contentComp={barChart.Content}
          />
          <Widget
            id='thumbsUp'
            contentComp={booleanWidget.Content}
            previewComp={booleanWidget.Preview}
          />
          <Widget
            id='nothin'
            width="2"
          />
          <Widget
            id='anotherEmpty'
          />
          <Widget
            id='activityLog'
            height="2"
            contentComp={activityWidget.Content}
          />
          <Widget
            id='empty'
          />
          <Widget
            id='wideEmpty'
            width="2"
          />
        </Dashboard>
      </main>
