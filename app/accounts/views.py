from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth import authenticate,login,logout
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from accounts.serializers import *
from django.utils import timezone
import jwt
from app.util import *
from accounts.util import *
# Registration
class CreateUserAPIView(APIView):
    permission_classes = (IsAuthenticated,IsAdminUser)
    def post(self,request,format=None):
        user = request.user
        if user:
            try:
                body = request.data
                if 'password' in body and 'email' in body:
                            # body['username']=re.search(r'[^@\s]+', body['email']).group()
                            serializer = UserSerializer(data = body)
                            if serializer.is_valid(raise_exception = True):
                                serializer.save()
                                user_data=serializer.data
                                user_data['password'] = body['password']
                                user = User.objects.get(email=user_data['email'])
                                token = get_tokens_for_user(user)
                                protocol = request.scheme
                                magic_link = f"{protocol}://{get_current_site(request).domain}/api/vi/user/login?token={token['jwt_token']}"
                                data = {'user':user_data,'magic_link':magic_link}
                                return Response(created(self,data))
                            return Response(error(self,'Invalid Data'))
                            
                else:
                    return Response(error(self,'password, user_type is Required'))
            except Exception as e:
                return Response(error(self,str(e)))
        return Response(forbidden(self, "Only Admin can create new user"))
        


class LoginAPIView(APIView):
    def post(self, request, format = None):
        email = request.data['email']
        password = request.data['password']

        #find user using email
        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found:)')
            
        if not user.check_password(password):
            raise AuthenticationFailed('Invalid password')

        token = get_tokens_for_user(user)
        user.last_login = timezone.now()
        user.save()
        serializer = UserSerializer(user)
        response = Response()
        response.set_cookie(key="token", value=token["access_token"], httponly=True)
        response.data = {
            'user': serializer.data
        }

        #if password correct
        return response

    def get(self, request):
        token = request.GET.get('token')

        if not token:
            raise AuthenticationFailed("Unauthenticated!")
        
        try:
            payload = jwt.decode(token, 'secret', algorithms="HS256")
            #decode gets the user

        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed("Unauthenticated!")
        
        user = User.objects.filter(id=payload['id']).first()
        token = get_tokens_for_user(user)
        user.last_login = timezone.now()
        user.save()
        serializer = UserSerializer(user)
        response = Response()
        response.set_cookie(key="token", value=token["access_token"], httponly=True)
        response.data = {
            'user': serializer.data
        }

        return response

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        request.user.auth_token.delete()
        return Response(success(self, "Logout Success"))