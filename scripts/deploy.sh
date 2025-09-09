#!/bin/bash

# Apex Digital Auto-Deploy Script
# Usage: ./scripts/deploy.sh [environment]

# Configuration
ENVIRONMENT=${1:-production}
FTP_SERVER="ftp.apex-digital.co.za"
FTP_USER="!YOUR_FTP_USERNAME!"
FTP_PASS="!YOUR_FTP_PASSWORD!"
LOCAL_DIR="./public"
REMOTE_DIR="/public_html"
SECURE_DIR="./secure-config"
SECURE_REMOTE_DIR="/secure-config"
BACKUP_DIR="./backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if lftp is installed
check_dependencies() {
    if ! command -v lftp &> /dev/null; then
        log_error "lftp is not installed. Please install it first."
        exit 1
    fi
}

# Create backup of current version
create_backup() {
    log_info "Creating backup of current version..."
    mkdir -p $BACKUP_DIR/$DATE
    
    lftp -u "$FTP_USER","$FTP_PASS" $FTP_SERVER <<EOF
    set ftp:ssl-allow no
    mirror --reverse $REMOTE_DIR $BACKUP_DIR/$DATE
    quit
EOF
    
    if [ $? -eq 0 ]; then
        log_info "Backup created successfully: $BACKUP_DIR/$DATE"
    else
        log_error "Failed to create backup"
        exit 1
    fi
}

# Deploy public files
deploy_public() {
    log_info "Deploying public files..."
    
    lftp -u "$FTP_USER","$FTP_PASS" $FTP_SERVER <<EOF
    set ftp:ssl-allow no
    mirror -R $LOCAL_DIR $REMOTE_DIR
    quit
EOF
    
    if [ $? -eq 0 ]; then
        log_info "Public files deployed successfully"
    else
        log_error "Failed to deploy public files"
        exit 1
    fi
}

# Deploy secure files
deploy_secure() {
    log_info "Deploying secure configurations..."
    
    lftp -u "$FTP_USER","$FTP_PASS" $FTP_SERVER <<EOF
    set ftp:ssl-allow no
    mirror -R $SECURE_DIR $SECURE_REMOTE_DIR
    quit
EOF
    
    if [ $? -eq 0 ]; then
        log_info "Secure configurations deployed successfully"
    else
        log_error "Failed to deploy secure configurations"
        exit 1
    fi
}

# Set permissions
set_permissions() {
    log_info "Setting permissions..."
    
    lftp -u "$FTP_USER","$FTP_PASS" $FTP_SERVER <<EOF
    set ftp:ssl-allow no
    chmod 755 $REMOTE_DIR
    chmod 644 $REMOTE_DIR/*
    chmod 700 $SECURE_REMOTE_DIR
    chmod 600 $SECURE_REMOTE_DIR/*
    quit
EOF
    
    if [ $? -eq 0 ]; then
        log_info "Permissions set successfully"
    else
        log_error "Failed to set permissions"
        exit 1
    fi
}

# Verify deployment
verify_deployment() {
    log_info "Verifying deployment..."
    
    # Check if main page loads
    if curl -s -I "https://$FTP_SERVER" | grep "200 OK" > /dev/null; then
        log_info "Website is accessible"
    else
        log_error "Website is not accessible"
        exit 1
    fi
    
    # Check AI integration
    if curl -s "https://$FTP_SERVER/assets/js/ai-integration.js" | grep "ApexAI" > /dev/null; then
        log_info "AI integration is working"
    else
        log_error "AI integration is not working"
        exit 1
    fi
}

# Main deployment process
main() {
    log_info "Starting deployment to $ENVIRONMENT environment..."
    
    check_dependencies
    create_backup
    deploy_public
    deploy_secure
    set_permissions
    verify_deployment
    
    log_info "Deployment completed successfully!"
    
    # Final message
    echo ""
    echo "=============================================="
    echo "🚀 Deployment Summary"
    echo "=============================================="
    echo "Environment: $ENVIRONMENT"
    echo "Backup: $BACKUP_DIR/$DATE"
    echo "Public Files: $REMOTE_DIR"
    echo "Secure Files: $SECURE_REMOTE_DIR"
    echo "Website: https://$FTP_SERVER"
    echo "=============================================="
}

# Run main function
main
