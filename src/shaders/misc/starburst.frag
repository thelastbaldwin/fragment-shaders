// Author:
// Title:

#ifdef GL_ES
precision mediump float;
#endif

const float PI = 3.1415926535897932384626433832795;
const float TAU = 2. * PI;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;


float normalizedAtan(vec2 dist){
    return atan(dist.y, dist.x) / (PI/2.);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy / u_resolution;
    //target
    vec2 center = vec2(0.5, 0.5);
    vec2 dist = abs(st - center);
    // vec2 dist = st - center;
    
    color += step(0.007, mod(normalizedAtan(dist), 0.05));
    // color += sin(tan(atan(dist.y, dist.x)));
    gl_FragColor = vec4(color, 1.);
}