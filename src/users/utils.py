from django.core.mail import EmailMultiAlternatives
from django.contrib.sites.shortcuts import get_current_site  # Get Current Website
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils import timezone
from django.conf import settings

from urllib.parse import quote


def send_email_verify(request, user):
    current_site = get_current_site(request)
    domain = current_site.domain
    token = quote(default_token_generator.make_token(user))
    uid = urlsafe_base64_encode(force_bytes(user.pk))
    activation_link = f"{settings.FRONT_END_URL}/activate?uid={uid}&token={token}"
    text_content = render_to_string(
    "email/activate.txt",
    context={
        'domain':domain,
        "user_name": user.username,
        "activation_link": activation_link,
        "expiry_time": timezone.now(),
    },
    )
    html_content = render_to_string(
            "email/activate.html",
            context={
                'domain':domain,
        "user_name": user.username,
        "activation_link": activation_link,
        "expiry_time": timezone.now(),
            },
        )
    msg = EmailMultiAlternatives(
    subject="Verify Your Email Address",
    body=text_content,
    from_email=settings.DEFAULT_FROM_EMAIL,
    to=[user.email],
    headers={"List-Unsubscribe": "<mailto:unsub@example.com>"},
    )
    msg.attach_alternative(html_content, "text/html")
    msg.send()
