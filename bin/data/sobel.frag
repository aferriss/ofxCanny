vec2 textureCoordinate;
vec2 leftTextureCoordinate;
vec2 rightTextureCoordinate;

vec2 topTextureCoordinate;
vec2 topLeftTextureCoordinate;
vec2 topRightTextureCoordinate;

vec2 bottomTextureCoordinate;
vec2 bottomLeftTextureCoordinate;
vec2 bottomRightTextureCoordinate;

uniform sampler2DRect inputImageTexture;

void main(){
    textureCoordinate = gl_TexCoord[0].st;
    leftTextureCoordinate = textureCoordinate + vec2(-1.0, 0.0);
    rightTextureCoordinate = textureCoordinate + vec2(1.0, 0.0);
    
    topTextureCoordinate = textureCoordinate + vec2(0.0, -1.0);
    topLeftTextureCoordinate = textureCoordinate + vec2(-1.0, -1.0);
    topRightTextureCoordinate = textureCoordinate + vec2(1.0, -1.0);
    
    bottomTextureCoordinate = textureCoordinate + vec2(0.0,1.0);
    bottomLeftTextureCoordinate = textureCoordinate + vec2(-1.0,1.0);
    bottomRightTextureCoordinate = textureCoordinate + vec2(1.0,1.0);
    
    
   float bottomLeftIntensity = texture2DRect(inputImageTexture, bottomLeftTextureCoordinate).r;
   float topRightIntensity = texture2DRect(inputImageTexture, topRightTextureCoordinate).r;
   float topLeftIntensity = texture2DRect(inputImageTexture, topLeftTextureCoordinate).r;
   float bottomRightIntensity = texture2DRect(inputImageTexture, bottomRightTextureCoordinate).r;
   float leftIntensity = texture2DRect(inputImageTexture, leftTextureCoordinate).r;
   float rightIntensity = texture2DRect(inputImageTexture, rightTextureCoordinate).r;
   float bottomIntensity = texture2DRect(inputImageTexture, bottomTextureCoordinate).r;
   float topIntensity = texture2DRect(inputImageTexture, topTextureCoordinate).r;

//   float h = -bottomLeftIntensity - 2.0 * leftIntensity - topLeftIntensity + bottomRightIntensity + 2.0 * rightIntensity + topRightIntensity;
//   float v = -topLeftIntensity - 2.0 * topIntensity - topRightIntensity + bottomLeftIntensity + 2.0 * bottomIntensity + bottomRightIntensity;
//   float mag = length(vec2(h, v));
//gl_FragColor = vec4(vec3(mag), 1.0);
    
    vec2 gradientDirection;
    gradientDirection.x = -bottomLeftIntensity - 2.0 * leftIntensity - topLeftIntensity + bottomRightIntensity + 2.0 * rightIntensity + topRightIntensity;
    gradientDirection.y = -topLeftIntensity - 2.0 * topIntensity - topRightIntensity + bottomLeftIntensity + 2.0 * bottomIntensity + bottomRightIntensity;

    float gradientMagnitude = length(gradientDirection);
    vec2 normalizedDirection = normalize(gradientDirection);
    normalizedDirection = sign(normalizedDirection) * floor(abs(normalizedDirection) + 0.617316); // Offset by 1-sin(pi/8) to set to 0 if near axis, 1 if away
    normalizedDirection = (normalizedDirection + 1.0) * 0.5; // Place -1.0 - 1.0 within 0 - 1.0

    gl_FragColor = vec4(gradientMagnitude, normalizedDirection.x, normalizedDirection.y, 1.0);
    
   
}