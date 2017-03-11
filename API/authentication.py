import datetime
from django.utils import timezone
from rest_framework.authentication import TokenAuthentication
from rest_framework import exceptions

# Overriding the default token class to get a token that expires after a while.
class ExpiringTokenAuthentication(TokenAuthentication):
    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.get(key=key)
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed('Invalid token')

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed('User inactive or deleted')

        utc_now = timezone.now()

        if token.created < utc_now - datetime.timedelta(hours=2):
            raise exceptions.AuthenticationFailed('Token has expired')

        return (token.user, token)