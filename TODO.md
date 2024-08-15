[] Bikin course harus tentuin jumlah session (yg gabisa diganti lagi)
[] Gabisa add session
[] Admin ngisi konten session doank jadi week udah di provide.
[] Schedule list nanti dapet dari endpoint GET class
[] Major (Waiting for backend)

NOTE :
- Admin gabisa ganti profile user
- Active itu tandain klo dia udah bayar
- Admin gabisa add / delete user, kalo edit cmn bisa role.
- User bisa ngedit semuanya kecuali email.
- Kalo create region, faculty, major harus ambil dari be, kalo ga di hardcode aja.

API request feature:
- GET user filter by role
- Class member join sama profile, jangan kasih liat password.
- Kalo add praetorian di replace aja

# CONCERNS
[] Ganti role cuman bisa sebelom class mulai
[] Kalo di dalem satu class ada 2 praeto (gara2 member ada yang diganti rolenya), yang praeto baru diganti di keluarin dari member class


