from django.db import models
from django.contrib.auth.models import Group, Permission
from django.contrib.auth.models import AbstractUser
class User(AbstractUser):
    role = models.CharField(max_length=20, default="guest")
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    username = models.CharField(max_length=255, default=None)
    groups = models.ManyToManyField(Group, related_name='custom_user_set')
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_set')
    USERNAME_FIELD = 'email' # login w/ email, unique identifier.
    REQUIRED_FIELDS = [] 

class AuthTransaction(models.Model):
    token = models.TextField(verbose_name=("JWT Access Token"))
    session = models.TextField(verbose_name=("Session Passed"))
    refresh_token = models.TextField(
        blank=True,
        verbose_name=("JWT Refresh Token"),
    )
    expires_at = models.DateTimeField(
        blank=True, null=True, verbose_name=("Expires At")
    )
    create_date = models.DateTimeField(
        verbose_name=("Create Date/Time"), auto_now_add=True
    )
    update_date = models.DateTimeField(
        verbose_name=("Date/Time Modified"), auto_now=True
    )
    created_by = models.ForeignKey(to=User, on_delete=models.PROTECT)

    def __str__(self):
        return str(self.created_by.role) + " | " + str(self.created_by.username)

