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


    float blur = leftIntensity + rightIntensity + topIntensity + bottomIntensity + bottomLeftIntensity + topRightIntensity + topLeftIntensity + bottomRightIntensity + texture2DRect(inputImageTexture, textureCoordinate).r;
    blur *= 0.11111;

   gl_FragColor = vec4(vec3(blur), 1.0);
}