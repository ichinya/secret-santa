"""Email delivery tasks."""
from app.workers import celery_app


@celery_app.task
def send_email(recipient: str, subject: str, body: str) -> None:
    """Stub email sender to be extended with SendGrid integration."""

    # TODO: integrate SendGrid/Mailgun client here.
    print(f"Sending email to {recipient}: {subject}\n{body}")
