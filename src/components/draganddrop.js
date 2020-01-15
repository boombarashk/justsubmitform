// https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929
import React, { Component } from 'react'

export default class DragAndDrop extends Component {
    dropRef = React.createRef()
    overlayRef = React.createRef()
    state = {
        dragging: false
    }

    handleDrag = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
    }

    handleDragIn = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        this.dragCounter++
        if (ev.dataTransfer.items && ev.dataTransfer.items.length > 0) {
            this.setState({dragging: true})
        }
    }
    handleMouseOut = () => {
        this.setState({dragging: false})
    }
    handleDragOut = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        this.dragCounter--
        //this.setState({dragging: false})
    }
    handleDrop = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        this.setState({drag: false})
        if (ev.dataTransfer.files && ev.dataTransfer.files.length > 0) { //e.files || e.dataTransfer.files
            this.props.handleDrop(ev.dataTransfer.files)

            ev.dataTransfer.clearData()
            this.dragCounter = 0
            this.setState({dragging: false})
        }
    }

    componentDidMount() {
        this.dragCounter = 0
        let droparea = this.dropRef.current
        droparea.addEventListener('dragenter', this.handleDragIn)
        droparea.addEventListener('dragover', this.handleDrag)
        droparea.addEventListener('drop', this.handleDrop)
        let overlay = this.overlayRef.current
        overlay.addEventListener('dragleave', this.handleDragOut)
        overlay.addEventListener('mouseout', this.handleMouseOut)
    }

    componentWillUnmount() {
        let droparea = this.dropRef.current
        droparea.removeEventListener('dragenter', this.handleDragIn)
        droparea.removeEventListener('dragover', this.handleDrag)
        droparea.removeEventListener('drop', this.handleDrop)
        let overlay = this.overlayRef.current
        overlay.removeEventListener('dragleave', this.handleDragOut)
        overlay.removeEventListener('mouseout', this.handleMouseOut)
    }

    render() {
        return (
            <div ref={this.dropRef} >
                <div ref={this.overlayRef}
                     className={`App-dndOverlay ${this.state.dragging ? '': 'App-dndOverlay_hidden'}`}>
                    <div className="App-dndOverlay-inner">
                        <h2>Бросайте файлы сюда, я ловлю</h2>
                    </div>
                </div>

                {this.props.children}
            </div>
        )
    }
}