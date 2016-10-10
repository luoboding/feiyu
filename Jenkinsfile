node{
	stage('Checkout source') {
        git branch: 'master', credentialsId: 'coloseo', url: 'https://github.com/coloseo/video-demo.git'
    }
    stage("Install NPM module") {
    	sh 'npm install'
    }
    stage("Build project"){
    	sh 'npm run build'
    }
    stage('pack file') {
        sh 'tar -czf all${env.BUILD_TAG}.tar.gz dest'
    }
    stage('copy file') {
        sh 'cp ${env.BUILD_TAG}.tar /mnt/www/feiyuhtml'
    }
    stage('unzip file') {
        sh 'tar -zxf ${env.BUILD_TAG}.tar.gz'
    }
}