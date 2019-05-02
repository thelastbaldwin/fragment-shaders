#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

const float PI = 3.1415926535897932384626433832795;
const float TAU = 2. * PI;

void main() {
  vec3 color = vec3(0.);
  vec2 st = gl_FragCoord.xy / u_resolution;
    
  float frequency = 4.;
  float offset = step(.5, sin(st.y  * frequency * TAU) * .5 + .5) * PI;
  float tileColor = step(.5, sin(st.x * frequency * TAU + offset) * .5 + .5);
  color += vec3(tileColor);
  gl_FragColor = vec4(color, 1.);
}
