pipeline {
  agent any

  stages {
    stage ('Build Image') {
      steps {
        script {
          dockerapp = docker.build("letarzan/api-clean-node", '-f ./Dockerfile .')
        }
      }
    }
    stage ('Push Image') {
      steps {
        script {
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            dockerapp.push('latest')
          }
        }
      }
    }
  }
}