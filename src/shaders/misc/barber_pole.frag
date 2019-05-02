#define M_PI 3.1415926535897932384626433832795

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float phase(vec2 pos, float offset, float frequency){
    return step(abs(sin(((u_time * .3 + pos.x - pos.y) * frequency) + offset)), .5);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.);
    float frequency = smoothstep(0., u_resolution.x , u_mouse.x) * 5.;
    vec3 red = vec3(phase(st, 0., frequency), 0., 0.);
    vec3 blue = vec3(0., 0., phase(st, M_PI/3., frequency));
    vec3 white = vec3(phase(st, 2. * (M_PI/3.), frequency));
    color += blue;
    color += red;
    color += white;
    gl_FragColor = vec4(color,1.0);
}