#!groovy

node {
    stage 'Checkout'
    checkout scm

    stage 'Build'
    sh 'git rev-parse --short HEAD > git-commit'
    sh 'npm install --no-bin-links'

    stage 'Bundle'
    sh "aws s3 cp --acl public-read --recursive dist s3://${env.S3_CDN_BUCKET}/${readFile('git-commit').trim()}"
}
