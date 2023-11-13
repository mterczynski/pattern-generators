pipeline {
    agent any

    environment {
        DESTINATION = "root@mterczynski.pl:/var/www/html/pattern-generators"
    }

    stages {
        stage('Install') {
            steps {
                sh "npm install"
            }
        }

        stage('Build') {
            steps {
                sh "npm run build"
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                scp -r build/* ${DESTINATION}
                exit
                '''
            }
        }
    }
}
