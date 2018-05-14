import React, { Component } from 'react';
import Canvas from 'react-native-canvas';

export default class App extends Component {

    handleCanvas = (canvas) => {
        canvas.width = 50;
        canvas.height = 50;

        const ctx = canvas.getContext('2d');

        ctx.shadowColor = 'black';
        ctx.shadowBlur = 10;

        ctx.fillStyle = 'green';
        ctx.fillRect(15, 15, 25, 25);
    }

    async handlePurpleRect(canvas) {
        const context = canvas.getContext('2d');

        context.fillStyle = 'purple';
        context.fillRect(0, 0, 100, 100);

        const {width} = await context.measureText('yo');
        console.log('"yo" text rendering width', width);
    }

    render() {
        return (
            <Canvas ref={this.handleCanvas} />
        )
    }
}