<template>
  <div class="login">
    <h1>Login</h1>
    <form @submit.prevent="loginWithEmail">
      <div>
        <label for="account">Email:</label>
        <input type="email" v-model="account" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <button type="submit" id="left-btn">Login</button>
      <button type="button" @click="loginWithGoogle">Google Account</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
    <div v-if="showOtpVerification">
      <form @submit.prevent="verifyOtp">
        <div>
          <label for="otp">OTP:</label>
          <input type="text" v-model="otp" required />
        </div>
        <button type="submit">Verify OTP</button>
      </form>
      <div v-if="qrCodeUrl">
        <img :src="qrCodeUrl" alt="QR Code">
        <p>{{ otpAuthUrl }}</p> 
      </div>
    </div>
  </div>
</template>

<script>
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

export default {
  data() {
    return {
      account: "",
      password: "",
      otp: "",
      error: null,
      showOtpVerification: false,
      userId: null,
      qrCodeUrl: null,
      otpAuthUrl: null,
    };
  },
  methods: {
    async loginWithEmail() {
      this.error = null; 
      try {
        const response = await fetch("http://localhost:3000/users/login", { 
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ account: this.account, password: this.password }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Login failed');
        }

        const data = await response.json();
        console.log('Login successful:', data);

        if (data.qrCodeUrl) {
          this.qrCodeUrl = data.qrCodeUrl;
          this.otpAuthUrl = data.otpAuthUrl; 
          this.userId = data.userId;
          this.showOtpVerification = true;
        } else {
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('userId', data.userId);
          const redirectPath = this.$route.query.redirect || '/';
          this.$router.push(`${redirectPath}?id=${data.userId}`);
        }
      } catch (err) {
        this.error = `Login failed: ${err.message}`;
      }
    },
    async verifyOtp() {
      this.error = null;
      try {
        const response = await fetch("http://localhost:3000/users/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: this.userId, otp: this.otp }),
        });

        if (!response.ok) throw new Error("OTP verification failed");

        sessionStorage.setItem('isLoggedIn', 'true');
        sessionStorage.setItem('userId', this.userId);
        const redirectPath = this.$route.query.redirect || '/';
        this.$router.push(`${redirectPath}?id=${this.userId}`);
      } catch (err) {
        this.error = `OTP verification failed: ${err.message}`;
      }
    },
    async loginWithGoogle() {
      this.error = null;
      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log('Google login successful:', result.user);

        const response = await fetch("http://localhost:3000/users/addGoogleUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ account: result.user.email, uid: result.user.uid }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error data:', errorData); // 调试信息
          throw new Error(errorData.error || 'Google login failed');
        }

        const data = await response.json();
        console.log('Google user added:', data);

        if (data.qrCodeUrl) {
          this.qrCodeUrl = data.qrCodeUrl;
          this.otpAuthUrl = data.otpAuthUrl; 
          this.userId = data.userId;
          this.showOtpVerification = true;
        } else {
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('userId', data.userId);
          const redirectPath = this.$route.query.redirect || '/';
          this.$router.push(`${redirectPath}?id=${data.userId}`);
        }
      } catch (err) {
        this.error = `Google login failed: ${err.message}`;
      }
    },
  },
};
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: auto;
  padding: 1em;
  border: 1px solid #ccc;
  border-radius: 1em;
}
form div {
  margin-bottom: 1em;
}
label {
  display: inline-block;
  width: 90px;
}
input {
  width: calc(100% - 100px);
}
button {
  padding: 0.7em;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 0.3em;
  cursor: pointer;
  margin-top: 10px;
}
.error {
  color: red;
}
#left-btn {
  margin-right: 17em;
}
</style>
