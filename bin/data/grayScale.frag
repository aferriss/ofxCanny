uniform sampler2DRect src_tex;

float luma(vec4 color) {
  return dot(color.rgb, vec3(0.299, 0.587, 0.114));
}


void main(){
    vec4 col = texture2DRect(src_tex, gl_TexCoord[0].st);
    float l = luma(col);
    
   gl_FragColor = vec4(vec3(l), 1.0);
}