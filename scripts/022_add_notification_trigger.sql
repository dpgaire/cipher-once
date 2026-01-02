CREATE OR REPLACE FUNCTION create_notification_on_new_message()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Insert a notification for the recipient
    INSERT INTO notifications (user_id, message, link)
    VALUES (
        NEW.recipient_id,
        'You have a new message from ' || COALESCE((SELECT full_name FROM profiles WHERE id = NEW.sender_id), 'Anonymous'),
        '/dashboard/inbox'
    );

    RETURN NEW;
END;
$$;

-- Create or replace the trigger to call the function when a new message is inserted
CREATE OR REPLACE TRIGGER trigger_create_notification_on_new_message
AFTER INSERT ON inbox_messages
FOR EACH ROW
EXECUTE FUNCTION create_notification_on_new_message();
