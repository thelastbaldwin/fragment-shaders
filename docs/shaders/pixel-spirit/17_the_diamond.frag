#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

float stroke(float x, float s, float w){
	float d = step(s, x + w * .5) - step(s, x - w * .5);
	return clamp(d, 0., 1.);
}

float circleSDF(vec2 st){
	return length(st - .5) * 2.;
}

float fill(float x, float size){
	return 1. - step(size, x);
}

float triSDF(vec2 st){
  st = (st * 2. -1.) * 2.;
  return max(abs(st.x) * 0.866025 + st.y * 0.5, -st.y * 0.5);
}

float rhombSDF(vec2 st){
	return max(triSDF(st), triSDF(vec2(st.x, 1. - st.y)));
}
void main() {
	vec3 color = vec3(0.);
	vec2 st = gl_FragCoord.xy / u_resolution;

	float sdf = rhombSDF(st);
	color += fill(sdf, .425);
	color += stroke(sdf, .5, .05);
	color += stroke(sdf, .6, .03);

	gl_FragColor = vec4(color, 1.);
}


