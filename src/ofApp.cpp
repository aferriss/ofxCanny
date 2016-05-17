#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
    w = 1280;
    h = 720;
    
    ofSetWindowShape(w, h);
    ofSetFrameRate(30);
    ofSetVerticalSync(true);
    
    shader.load("nms_thresh");
    canny.load("canny");
    sobel.load("sobel");
    grayScale.load("grayScale");
    blur.load("blur");
    
    img.load("img.png");
    img.resize(w, h);
    
    cam.initGrabber(w, h);
    
    fbo1.allocate(w, h, GL_RGB);
    fbo2.allocate(w, h, GL_RGB);
    
}

//--------------------------------------------------------------
void ofApp::update(){
    cam.update();
}

//--------------------------------------------------------------
void ofApp::draw(){
    

    fbo1.begin();
        grayScale.begin();
            grayScale.setUniformTexture("src_tex", cam.getTexture(), 0);
            cam.draw(0,0);
        grayScale.end();
    fbo1.end();
        
    fbo2.begin();
        blur.begin();
            blur.setUniformTexture("inputImageTexture", fbo1.getTexture(), 0);
            fbo1.draw(0,0);
        blur.end();
    fbo2.end();
    
    fbo1.begin();
        blur.begin();
            blur.setUniformTexture("inputImageTexture", fbo2.getTexture(), 0);
            fbo2.draw(0,0);
        blur.end();
    fbo1.end();
    
    fbo2.begin();
        blur.begin();
            blur.setUniformTexture("inputImageTexture", fbo1.getTexture(), 0);
            fbo1.draw(0,0);
        blur.end();
    fbo2.end();
    
    fbo1.begin();
        sobel.begin();
            sobel.setUniformTexture("inputImageTexture", fbo2.getTexture(), 0);
            fbo2.draw(0,0);
        sobel.end();
    fbo1.end();
    
    fbo2.begin();
        canny.begin();
            canny.setUniformTexture("inputImageTexture", fbo1.getTexture(), 0);
            canny.setUniform1f("texelWidth", 1.0);
            canny.setUniform1f("texelHeight", 1.0);
            canny.setUniform1f("upperThreshold", 0.4);
            canny.setUniform1f("lowerThreshold", 0.1);
                fbo1.draw(0,0);
        canny.end();
    fbo2.end();
    
    fbo2.draw(0,0);
    
    
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
