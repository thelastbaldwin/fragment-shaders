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
    vec2 target = u_mouse/u_resolution;
    vec2 dist = st - target;

    // distance from corner to corner
    float max_dist = distance(vec2(0., 0.), vec2(1., 1.));

    float threshold = .99 * smoothstep(0.25, distance(u_mouse,dist), max_dist);

    color += step(threshold, sin(atan(dist.y, dist.x) * 60.));
    gl_FragColor = vec4(color, 1.);
}