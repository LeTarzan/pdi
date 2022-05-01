pipeline {
  agent any

  stages {
    stage ('Build Project') {
      steps {
        sh 'npm run build'
      }
    }
    stage ('Build Image') {
      steps {
        script {
          dockerapp = docker.build("letarzan/api-clean-node", '-f ./Dockerfile .')
        }
      }
    }
  }
}