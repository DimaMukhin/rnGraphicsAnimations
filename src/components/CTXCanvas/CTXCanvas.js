import React, { Component } from 'react';
import Canvas from 'react-native-canvas';
// import { EDESTADDRREQ } from 'constants';

// define the path to plot
var vertices=[];
vertices.push({x:0,y:0});
vertices.push({x:300,y:100});
vertices.push({x:80,y:200});
vertices.push({x:10,y:100});
vertices.push({x:0,y:0});

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
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        let grd = await ctx.createLinearGradient(0,0,200,0);
        grd.addColorStop(0,"red");
        grd.addColorStop(1,"white");
        ctx.strokeStyle = grd;
        ctx.shadowColor = 'red';
        ctx.shadowBlur = 20;
        this.animate(ctx);
    }

    points = this.calcWaypoints(vertices);
    t = 1;
    animate = async (ctx) => {
        if(this.t<this.points.length-1){ requestAnimationFrame(() => this.animate(ctx)); }
        // draw a line segment from the last waypoint
        // to the current waypoint
        ctx.beginPath();
        ctx.moveTo(this.points[this.t-1].x,this.points[this.t-1].y);
        ctx.lineTo(this.points[this.t].x,this.points[this.t].y);
        ctx.stroke();
        // increment "t" to get the next waypoint
        this.t++;
    }

    // calc waypoints traveling along vertices
    calcWaypoints(vertices){
        var waypoints=[];
        for(var i=1;i<vertices.length;i++){
            var pt0=vertices[i-1];
            var pt1=vertices[i];
            var dx=pt1.x-pt0.x;
            var dy=pt1.y-pt0.y;
            for(var j=0;j<100;j++){
                var x=pt0.x+dx*j/100;
                var y=pt0.y+dy*j/100;
                waypoints.push({x:x,y:y});
            }
        }
        return(waypoints);
    }

    handleCanvas2 = async (canvas) => {
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

    render() {
        return (
            <Canvas ref={this.handleCanvas} />
        )
    }
}