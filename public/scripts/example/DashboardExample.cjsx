React = require 'react'
{Dashboard, Widget, Config, Content} = require '../dashboard'
weatherWidget = require './weatherWidget'
_ = require 'underscore'
pieChart = require './PieChartExample'
barChart = require './BarChartExample'
activityWidget = require './ActivityExample'
booleanWidget = require './BooleanWidgetExample'
Modal = require 'react-modal'

customStyles =
  content:
    top                   : '50%'
    left                  : '50%'
    right                 : 'auto'
    bottom                : 'auto'
    marginRight           : '-50%'
    transform             : 'translate(-50%, -50%)'

# Make sure to bind modal to your appElement
Modal.setAppElement('#app')

module.exports = React.createClass
  displayName: 'ExampleDashboard'

  getInitialState: ->
    widgets = [
      {
        widgetId: 'weather'
        config: { location: 'orl', title: 'Orlando' }
      },
      {
        widgetId: 'accident'
        description: 'Lorem ipsum dolor accident'
        config: { days: Math.floor(Math.random() * 365) + 1 }
      },
      {
        widgetId: 'weather'
        config: { location: 'stl', title: 'St. Louis' }
      },
      {
        widgetId: 'activityLog'
        description: 'Lorem ipsum dolor activityLog'
        config: { title: 'Activity Feed' }
      },
      {
        widgetId: 'pie'
        description: 'Lorem ipsum dolor pie'
        config: { title: 'My Average Day' }
      },
      {
        widgetId: 'barChart'
        description: 'Lorem ipsum dolor barChart'
        config: { title: 'Numbers by Date' }
      },
      {
        widgetId: 'thumbsUp'
        description: 'Lorem ipsum dolor thumbsUp'
        config: { title: 'System Status' }
      },
      {
        widgetId: 'nothin'
        description: 'Lorem ipsum dolor nothin'
        config: { title: 'Interesting Widget' }
      },
    ]

    accidentWidget = (props) ->
      <div className='days-since-last'>
        <div className='days'>{props.config.days}</div>
        <div className='text'>days since last accident</div>
      </div>

    widgetLib =
      accident:
        contentComp: accidentWidget
        description: 'Widget of type "accident"'
        config: { days: Math.floor(Math.random() * 365) + 1 }
      weather:
        contentComp: weatherWidget.Content
        description: 'Widget of type "weather"'
        config: { location: 'orl', title: 'Orlando' }
      pie:
        contentComp: pieChart.Content
        description: 'Widget of type "pie"'
        config: { title: 'My Average Day' }
      barChart:
        contentComp: barChart.Content
        width: 2
        description: 'Widget of type "barChart"'
        config: { title: 'Numbers by Date' }
      thumbsUp:
        contentComp: booleanWidget.Content
        description: 'Widget of type "thumbsUp"'
        config: { title: 'System Status' }
      nothin:
        contentComp: -> <div></div>
        width: 2
        description: 'Widget of type "nothin"'
        config: { title: 'Interesting Widget' }
      anotherEmpty:
        contentComp: -> <div></div>
        description: 'Widget of type "anotherEmpty"'
        config: { title: 'Empty Widget' }
      activityLog:
        contentComp: activityWidget.Content
        height: 2
        description: 'Widget of type "activityLog"'
        config: { title: 'Activity Feed' }

    isModalOpen: false
    modalOptions: Object.keys(widgetLib).map (id) =>
      widget = widgetLib[id]
      <option key={id} value={id}>
        { widget.config.title || id }
      </option>
    widgets: widgets
    widgetLib: widgetLib
    widgetComponents: Object.keys(widgetLib).map (id) =>
      widget = widgetLib[id]
      <Widget
        id={id}
        key={id}
        contentComp={widget.contentComp}
        width={widget.width}
        height={widget.height}
      />

  actionSettings: (index) ->
    console.warn('Settings widget ', index)

  actionRemove: (index) ->
    widgetList = @state.widgets.slice(0)
    widgetList.splice(index, 1)
    @setState widgets: widgetList

  actionExport: (index) ->
    console.warn('Export data from widget ', index)

  getMenu: ->
    [
      {
        title: 'Settings'
        type: 'action'
        handler: @actionSettings
      },
      {
        type: 'divider'
      },
      {
        title: 'Remove'
        type: 'action'
        handler: @actionRemove
      },
      {
        title: 'Export'
        type: 'action'
        handler: @actionExport
      },
    ]

  toggleModal: ->
    @setState isModalOpen: !@state.isModalOpen

  afterOpenModal: ->
    selector = document.getElementById('widgets-selector');
    selector.focus()

  addWidget: ->
    { widgetToAdd, widgetLib, widgets } = @state

    if !widgetToAdd
      return

    lib = widgetLib[widgetToAdd] || {}
    widgets = [].concat widgets
    widgets.push
      widgetId: widgetToAdd
      description: lib.description
      config: lib.config || {}

    @setState
      widgets: widgets
      widgetToAdd: null
      isModalOpen: false

  widgetsChange: (widgets) ->
    @setState widgets: widgets

  setWidgetToAdd: (event) ->
    @setState widgetToAdd: event.target.value

  render: ->
    {
      isModalOpen,
      widgetLib,
      widgets,
      modalOptions,
      widgetComponents
    } = @state;

    menu = @getMenu();

    <main className='example-dash-wrapper'>
      <header>
        <button tabIndex={1} onClick={@toggleModal}>
          { if isModalOpen then 'Done' else 'Add Widgets' }
        </button>
      </header>

      <Modal
        isOpen={@state.isModalOpen}
        onAfterOpen={@afterOpenModal}
        onRequestClose={@toggleModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 style={{ marginTop: 0, fontSize: 15 }}>Select Widget to Add</h2>
        <section>
          <select id="widgets-selector" onChange={@setWidgetToAdd}>
            <option value={null}>Select a widget</option>
            {modalOptions}
          </select>
        </section>
        <section style={{ textAlign: 'right', marginTop: 20 }}>
          <button onClick={@addWidget}>Add</button>
          <button onClick={@toggleModal}>Cancel</button>
        </section>
      </Modal>

      <Dashboard
        className={'home-page'}
        widgets={widgets}
        menu={menu}
        onWidgetsChange={@widgetsChange}
        widgetHeight={280}
        widgetWidth={280}
        widgetMargin={16}
        titleHeight={60}
        maxColumns={8}
      >
        {widgetComponents}
      </Dashboard>
    </main>
