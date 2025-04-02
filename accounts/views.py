from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib import messages
from django.views import View
from .models import CustomUser
from .forms import RegisterForm, LoginForm

class RegisterView(View):
    def get(self, request):
        form = RegisterForm()
        return render(request, 'accounts/register.html', {'form': form})

    def post(self, request):
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.is_active = False  # Prevent login until email is verified
            user.generate_verification_token()
            user.save()
            user.send_verification_email()
            messages.success(request, "Check your email to verify your account.")
            return redirect('login')
        return render(request, 'accounts/register.html', {'form': form})

class VerifyEmailView(View):
    def get(self, request, token):
        try:
            user = CustomUser.objects.get(verification_token=token)
            user.email_verified = True
            user.verification_token = None
            user.is_active = True  # Activate account after verification
            user.save()
            messages.success(request, "Email verified successfully. You can now log in.")
            return redirect('login')
        except CustomUser.DoesNotExist:
            messages.error(request, "Invalid verification link.")
            return redirect('register')

class LoginView(View):
    def get(self, request):
        form = LoginForm()
        return render(request, 'accounts/login.html', {'form': form})

    def post(self, request):
        form = LoginForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            if user.email_verified:
                login(request, user)
                return redirect('dashboard')
            else:
                messages.error(request, "Please verify your email before logging in.")
                return redirect('login')
        messages.error(request, "Invalid credentials.")
        return render(request, 'accounts/login.html', {'form': form})

class LogoutView(View):
    def get(self, request):
        logout(request)
        messages.success(request, "Logged out successfully.")
        return redirect('login')

class DashboardView(View):
    def get(self, request):
        return render(request, 'accounts/dashboard.html', {'user': request.user})
