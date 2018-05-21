import React, { Component } from 'react';
import Canvas from 'react-native-canvas';

export default class App extends Component {

    x = 0;

    componentDidMount() {
        // this.draw();
    }

    draw = async (ctx) => {
        // console.log('draw!!!');
        ctx.clearRect(0,0,300,150);
        
        

        ctx.shadowColor = 'black';
        ctx.shadowBlur = 10;

        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, 15, 100, 100);

        this.x += 0.5;
        
        requestAnimationFrame(() => {this.draw(ctx)});
    }

    handleCanvas = async (canvas) => {
        console.log('Handle Canvas!');

        const ctx = await canvas.getContext('2d');

        // // shadows
        ctx.shadowColor = 'black';
        ctx.shadowBlur = 10;
        // ctx.shadowOffsetX = 10;
        // ctx.shadowOffsetY = 10;

        // // green rect
        // ctx.fillStyle = 'green';
        // ctx.fillRect(15, 15, 100, 100);

        // // Create gradient
        let grd = await ctx.createLinearGradient(0,0,200,0);
        grd.addColorStop(0,"red");
        grd.addColorStop(1,"white");

        // // gradient rect
        ctx.fillStyle=grd;
        // ctx.fillRect(10,10,150,80);

        ctx.beginPath();
        ctx.moveTo(75, 50);
        ctx.lineTo(100, 75);
        ctx.lineTo(100, 25);
        ctx.fill();

        // ctx.clearRect(0, 0, 150, 150);

        // this.draw(ctx);
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