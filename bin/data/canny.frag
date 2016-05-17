uniform sampler2DRect inputImageTexture;
uniform float texelWidth;
uniform float texelHeight;
uniform float upperThreshold;
uniform float lowerThreshold;

void main()
{
    vec2 textureCoordinate = gl_TexCoord[0].st;
    
    vec3 currentGradientAndDirection = texture2DRect(inputImageTexture, textureCoordinate).rgb;
    vec2 gradientDirection = ((currentGradientAndDirection.gb * 2.0) - 1.0) * vec2(texelWidth, texelHeight);

    float firstSampledGradientMagnitude = texture2DRect(inputImageTexture, textureCoordinate + gradientDirection).r;
    float secondSampledGradientMagnitude = texture2DRect(inputImageTexture, textureCoordinate - gradientDirection).r;

    float multiplier = step(firstSampledGradientMagnitude, currentGradientAndDirection.r);
    multiplier = multiplier * step(secondSampledGradientMagnitude, currentGradientAndDirection.r);

    float thresholdCompliance = smoothstep(lowerThreshold, upperThreshold, currentGradientAndDirection.r);
    multiplier = multiplier * thresholdCompliance;

    gl_FragColor = vec4(multiplier, multiplier, multiplier, 1.0);
}

//
////in vec4 texCoord;
////out vec4 angle;
////out vec4 fragColor;
//uniform sampler2DRect tex_in;
//uniform vec2 res;
//
//#define theta_360 360.0
//#define theta_22_5 22.5
//#define theta_67_5 67.5
//#define theta_112_5 112.5
//#define theta_157_5 157.5
//#define theta_202_5 202.5
//#define theta_247_5 247.5
//#define theta_292_5 292.5
//#define theta_337_5 337.5
//
////uniform float coeffs_fx[9] = float[9](-1.0, 0.0, 1.0,
////                                    -2.0, 0.0, 2.0,
////                                    -1.0, 0.0, 1.0);
//
//float coeffs_fx[9];
//float coeffs_fy[9];
//vec2 offset[9];
////
////uniform float coeffs_fy[9] = float[9](1.0, 2.0, 1.0, 
////                                    0.0, 0.0, 0.0,
////                                    -1.0, -2.0, -1.0);
//
//
//
////uniform vec2 offset[9] = vec2[9](vec2(-1.0, 1.0), vec2(0.0, 1.0), vec2(1.0, 1.0), 
////                               vec2(-1.0, 0.0), vec2(0.0, 0.0), vec2(1.0, 0.0), 
////                               vec2(-1.0, -1.0), vec2(0.0, -1.0), vec2(1.0, -1.0));
//
//void main(){
//    
//    coeffs_fx[0] = -1.0;
//    coeffs_fx[1] = 0.0;
//    coeffs_fx[2] = 1.0;
//    coeffs_fx[3] = -2.0;
//    coeffs_fx[4] = 0.0;
//    coeffs_fx[5] = 2.0;
//    coeffs_fx[6] = -1.0;
//    coeffs_fx[7] = 0.0;
//    coeffs_fx[8] = 1.0;
//    
//    coeffs_fy[0] = 1.0;
//    coeffs_fy[1] = 2.0;
//    coeffs_fy[2] = 1.0;
//    coeffs_fy[3] = 0.0;
//    coeffs_fy[4] = 0.0;
//    coeffs_fy[5] = 0.0;
//    coeffs_fy[6] = -1.0;
//    coeffs_fy[7] = -2.0;
//    coeffs_fy[8] = -1.0;
//    
//    offset[0] = vec2(-1.0, 1.0);
//    offset[1] = vec2(0.0, 1.0);
//    offset[2] = vec2(1.0, 1.0);
//    offset[3] = vec2(-1.0, 0.0);
//    offset[4] = vec2(0.0,0.0);
//    offset[5] = vec2(1.0, 0.0);
//    offset[6] = vec2(-1.0, -1.0);
//    offset[7] = vec2(0.0, -1.0);
//    offset[8] = vec2(1.0, -1.0);
//    
//    
//    vec2 pos;
//    float theta;
//    float y = 0.0, gx = 0.0, gy = 0.0;
////    ivec2 tex_size = textureSize(tex_in, 0);
//    vec2 tex_size = res;
//    
//    vec2 current = gl_TexCoord[0].st;
//    
//    for (int i = 0; i < 9; i++) {
//        pos.x = (current.x + offset[i].x ) ;/// tex_size.x;
//        pos.y = (current.y + offset[i].y ) ;/// tex_size.y;
//        y = texture2DRect(tex_in, pos).r;
//        gx += (y*coeffs_fx[i]);
//        gy += (y*coeffs_fy[i]);
//    }
//	y = ((gx*gx)+(gy*gy));
//    
//    theta = degrees(atan(abs(gy), abs(gx)));
//    if (gx >= 0.0 && gy >= 0.0)
//        theta += 0.0;
//    else if (gx < 0.0 && gy >= 0.0)
//        theta = 180.0-theta;
//    else if (gx < 0.0 && gy < 0.0)
//        theta = 180.0+theta;
//    else
//        theta = 360.0-theta;
//    
//    if ((theta >= theta_22_5 && theta < theta_67_5)||(theta >= theta_202_5 && theta < theta_247_5))
//        theta = 0.25;
//    else if ((theta >= theta_67_5 && theta < theta_112_5)||(theta >= theta_247_5 && theta < theta_292_5))
//        theta = 0.5;
//    else if ((theta >= theta_112_5 && theta < theta_157_5)||(theta >= theta_292_5 && theta < theta_337_5))
//        theta = 0.75;
//    else
//        theta = 0.0;
//    
////    angle = vec4(theta, 0.0, 0.0, 1.0);
//    gl_FragColor = vec4(y, y, y, 1.0);
//}