<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AdminAuth
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // Check the request path
        $path = $request->path();

        // If the request is to /wp-admin or any of its subpaths
        if (str_starts_with($path, 'wp-admin')) {
            // Check if the admin is authenticated using the 'admin' guard
            if (!Auth::guard('admin')->check()) {
                return redirect('/wp-admin/LoginAdmin');
            }
        }

        // If the request is to /stadium or any of its subpaths, just continue
        // No additional checks are needed

        return $next($request);
    }


}

