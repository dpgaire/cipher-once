-- Schedule a cron job to run the delete_expired_secrets function every hour
SELECT cron.schedule('delete-expired-secrets', '0 * * * *', 'SELECT delete_expired_secrets()');
