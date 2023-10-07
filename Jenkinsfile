pipeline {
    agent {
        label 'ubuntu-latest'
    }
    
    triggers {
        cron('0 7 * * 6')
    }

    stages {
        stage('Install dependencies') {
            steps {
                nodejs('14.x') {
                    sh 'npm ci'
                }
            }
        }

        stage('Run tests') {
            steps {
                nodejs('14.x') {
                    sh 'mocha test/saucedemoTests/inventoryPageTests.js'
                }
            }
        }
    }
}