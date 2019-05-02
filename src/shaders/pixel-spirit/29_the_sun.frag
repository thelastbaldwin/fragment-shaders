#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

const float PI = 3.1415926535897932384626433832795;
const float TAU = 2. * PI;
const float QTR_PI = .25 * PI;

// 04
float stroke(float x, float s, float w){
    float d = step(s, x + w * .5) - step(s, x - w * .5);
    return clamp(d, 0., 1.);
}

// 09
float fill(float x, float size){
    return 1. - step(size, x);
}

// 26
vec2 rotate(vec2 st, float a){
    st = mat2(cos(a), -sin(a), sin(a), cos(a)) * (st -.5);
    return st + .5;
}

// 27
float polySDF(vec2 st, int V) {
    st = st * 2. -1.;
    float a = atan(st.x, st.y) + PI;
    float r = length(st);
    float v = TAU/float(V);
    return cos(floor(.5 + a / v) * v - a) * r;
}

// 28
float starSDF(vec2 st, int V, float s) {
    st = st * 4. - 2.;
    float a = atan(st.y, st.x) / TAU;
    float seg = a * float(V);
    a = ((floor(seg) + 0.5) / float(V) + mix(s, -s, step(.5, fract(seg)))) * TAU;
    return abs(dot(vec2(cos(a), sin(a)), st));
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution;
    st = (st-.5)*1.1912+.5;
    st = mix(vec2((st.x*u_resolution.x/u_resolution.y)-(u_resolution.x*.5-u_resolution.y*.5)/u_resolution.y,st.y),
         vec2(st.x,st.y*(u_resolution.y/u_resolution.x)-(u_resolution.y*.5-u_resolution.x*.5)/u_resolution.x),
         step(u_resolution.x,u_resolution.y));
    st = (st-.5)*1.5+.5;
    //START
    float bg = starSDF(st,16,.1);
    color += fill(bg,1.3);
    float l = 0.;
    for (float i = 0.; i < 8.; i++) {
        vec2 xy = rotate(st,QTR_PI*i);
        xy.y -= .3;
        float tri = polySDF(xy,3);
        color += fill(tri,.3);
        l += stroke(tri,.3,.03);
    }
    color *= 1.-l;
    float c = polySDF(st,8);
    color -= stroke(c,.15,.04);
    //END
    gl_FragColor = vec4(color,1.);
}