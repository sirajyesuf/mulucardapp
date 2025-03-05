@component('mail::message')
# Your Magic Login Link

Click the button below to log in to your account:

@component('mail::button', ['url' => $url])
Login Now
@endcomponent

**Note:** This link will expire in 15 minutes.

Thanks,
{{ config('app.name') }}
@endcomponent
