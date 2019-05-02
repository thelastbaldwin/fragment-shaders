#define PI 3.1415926535897932384626433832795

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float phase(vec2 pos, float offset, float frequency){
    return abs(sin(((u_time * .3 - distance(pos, vec2(.5, .5))) * frequency) + offset));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    float frequency = 5.;
    vec3 white = vec3(phase(st, 0., frequency));
    vec3 red = vec3(phase(st, PI/2., frequency), 0., 0.);
    color += white;
    color += red;
    gl_FragColor = vec4(color,1.0);
}