
//in vec4 texCoord;
//out vec4 fragColor;
uniform float threshold;
uniform sampler2DRect tex_in;
uniform vec2 res;

vec2 offset[8];


void main()
{
    
    offset[0] = vec2(-1.0, 1.0);
    offset[1] = vec2(0.0, 1.0);
    offset[2] = vec2(1.0, 1.0);
    offset[3] = vec2(-1.0, 0.0);
    offset[4] = vec2(1.0, 0.0);
    offset[5] = vec2(-1.0, -1.0);
    offset[6] = vec2(0.0, -1.0);
    offset[7] = vec2(1.0, -1.0);
    
    vec2 pos;
    vec2 current = gl_TexCoord[0].st;
    
//    ivec2 tex_size = textureSize(tex_in, 0);
    vec2 tex_size = res;
    
    float data = texture2DRect(tex_in, current).r;
    float flag = 0.0;
    
//    float len = offset.length();
    
    for (int i = 0; flag == 0.0 &&  i < 8; i++) {
        pos.x = (current.x+(offset[i].x )) / tex_size.x;/// tex_size.x);
        pos.y = (current.y+(offset[i].y )) / tex_size.y;/// tex_size.y);
        
        if (data <= texture2DRect(tex_in, pos).r){
            flag = 1.0;
        }
    }
    
    data = flag == 1.0 ? 0.0 : data;
    
//    data = (data > 0.0)?1.0:0.0;
    data = (data > threshold) ? 1.0:0.0;
    gl_FragColor = vec4(data, data, data, 1.0);
}