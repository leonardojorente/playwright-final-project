pipeline {
    agent any

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm install'
            }
        }
    stage('Check typescript') {
            steps {
                sh 'npx tsc --noEmit'
            }
        }
    stage('Check ESLint') {
            steps {
                sh 'npx eslint "tests/**"'
            }
        }

    stage('Playwright tests') {
            steps {
                sh 'npx playwright test tests/ui/e2e-tests/basic-tests.spec.ts'
            }
        }
    }
}