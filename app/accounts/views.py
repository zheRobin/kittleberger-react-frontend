from django.contrib.sites.shortcuts import get_current_site
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from master.util import *
from accounts.serializers import *
import re
import jwt
import datetime

def get_tokens_for_user(user):
    refresh_token = RefreshToken.for_user(user)
    access_token = AccessToken.for_user(user)
    payload = {
                "id": user.id,
                "email": user.email,
                "exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
                "iat": datetime.datetime.utcnow()
            }

    jwt_token = jwt.encode(payload, 'secret', algorithm='HS256')
    return {
        'refresh_token': str(refresh_token),
        'access_token': str(access_token),
        'jwt_token': str(jwt_token)
    }
# Registration
class registerAPIView(APIView):
    def post(self,request,format=None): 
        try:
            body = request.data
            if 'password' in body and 'email' in body:
                        body['username']=re.search(r'[^@\s]+', body['email']).group()
                        serializer = UserSerializer(data = body)
                        if serializer.is_valid(raise_exception = True):   #remove the the raise_exception = True
                            serializer.save()
                            user_data=serializer.data
                            user = User.objects.get(username=user_data['username'])
                            token = get_tokens_for_user(user)
                            protocol = request.scheme
                            magic_link = f"{protocol}://{get_current_site(request).domain}/api/vi/user/login?token={token['jwt_token']}"
                            data = {'user':user_data,'magic_link':magic_link}
                            return Response(success(self,data))
                        return Response(error(self,'Invalid Data'))
                        
            else:
                return Response(error(self,'password, user_type is Required'))
        except Exception as e:
            return Response(error(self,str(e))) 


class LoginAPIView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        #find user using email
        user = User.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('User not found:)')
            
        if not user.check_password(password):
            raise AuthenticationFailed('Invalid password')

        token = get_tokens_for_user(user)

        response = Response() 

        response.set_cookie(key='jwt', value=token['jwt_token'], httponly=True)  #httonly - frontend can't access cookie, only for backend

        response.data = {
            'token': token
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
        serializer = UserSerializer(user)

        return Response(serializer.data)
        #cookies accessed if preserved

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'successful'
        }

        return response