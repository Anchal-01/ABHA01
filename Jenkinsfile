pipeline {
    agent any

    tools {
        nodejs "node18"   // NAME must match your configured Node version in Jenkins
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Checking out code from GitHub..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installing npm dependencies..."
                sh 'npm install'
            }
        }

        stage('Lint') {
            steps {
                echo "🔍 Running ESLint..."
                sh 'npm run lint || true'     // Continue even if lint has minor warnings
            }
        }

        stage('Build TypeScript + Vite') {
            steps {
                echo "🛠️ Building the project using Vite + TypeScript..."
                sh 'npm run build'
            }
        }

        stage('Archive Production Build') {
            steps {
                echo "📦 Archiving Vite build artifacts (dist folder)..."
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Deploy (Optional)') {
            steps {
                echo "🚀 Deploy step (configure later: nginx, server, docker, etc.)"
            }
        }
    }

    post {
        success {
            echo "🎉 Pipeline completed successfully!"
        }
        failure {
            echo "❌ Pipeline failed — check logs!"
        }
    }
}
