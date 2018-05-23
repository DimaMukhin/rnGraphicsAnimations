import React, { Component } from 'react';
import { TouchableWithoutFeedback, View, Button } from 'react-native';
import Canvas from 'react-native-canvas';
// import { EDESTADDRREQ } from 'constants';

// define the path to plot
var vertices=[];
vertices.push({x:106,y:52});
vertices.push({x:133,y:52});
vertices.push({x:138,y:51});
vertices.push({x:142,y:55});
vertices.push({x:152,y:26});
vertices.push({x:162,y:69});
vertices.push({x:167,y:50});
vertices.push({x:172,y:56});
vertices.push({x:176,y:50});
vertices.push({x:180,y:52});
vertices.push({x:200,y:52});

export default class App extends Component {

    x = 0;
    ctx = null;

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

        ctx = await canvas.getContext('2d');

        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        ctx.strokeStyle = 'gray';
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (let vertex of vertices) {
            ctx.lineTo(vertex.x,vertex.y);
        }
        ctx.stroke();
        ctx.closePath();

        let grd = await ctx.createLinearGradient(100,0,200,0);
        grd.addColorStop(0,"red");
        grd.addColorStop(1,"orange");
        ctx.strokeStyle = grd;
        ctx.shadowColor = 'red';
        ctx.shadowBlur = 5;
        // this.animate(ctx);
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
            var dist = Math.floor(Math.sqrt(dx*dx + dy*dy) / 3);
            for(var j=0;j<=dist;j++){
                var x=pt0.x+dx*j/dist;
                var y=pt0.y+dy*j/dist;
                waypoints.push({x:x,y:y});
            }
        }
        return(waypoints);
    }

    onCanvasPressed = async () => {
        console.log('pressed!');
        ctx.clearRect(0, 0, 300, 150);

        ctx.strokeStyle = 'gray';
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (let vertex of vertices) {
            ctx.lineTo(vertex.x,vertex.y);
        }
        ctx.stroke();
        ctx.closePath();

        let grd = await ctx.createLinearGradient(100,0,200,0);
        grd.addColorStop(0,"red");
        grd.addColorStop(1,"orange");
        ctx.strokeStyle = grd;
        ctx.shadowColor = 'red';
        ctx.shadowBlur = 16;
        this.t = 1;
        this.animate(ctx);
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
            <View>
                <TouchableWithoutFeedback onPress={this.onCanvasPressed}>
                    <Canvas ref={this.handleCanvas} onPress={this.onCanvasPressed}/>
                </TouchableWithoutFeedback>
                <Button
                    onPress={this.onCanvasPressed}
                    title="Re-Animate"
                    color="#841584"
                />
            </View>
        )
    }
}