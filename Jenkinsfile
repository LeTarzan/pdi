pipeline {
  agent any

  stages {
    stage ('Build Image') {
      steps {
        script {
          dockerapp = docker.build("letarzan/api-clean-node", '-f . .')
        }
      }
    }
  }
}