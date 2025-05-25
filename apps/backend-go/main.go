package main

import (
	"context"
	"log"
	"net/http"
  
	"connectrpc.com/connect"
	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
  
	userv1 "example.com/backend-go/gen"
	userv1connect "example.com/backend-go/gen/userv1connect"
)

type UserServer struct{}

func (s *UserServer) GetUser(
	ctx context.Context,
	req *connect.Request[userv1.GetUserRequest],
) (*connect.Response[userv1.GetUserResponse], error) {
	log.Printf("Got request for user ID: %s", req.Msg.Id)
	
	user := &userv1.User{
		Id:    req.Msg.Id,
		Name:  "Test User",
		Email: "test@example.com",
	}
	
	res := connect.NewResponse(&userv1.GetUserResponse{
		User: user,
	})
	res.Header().Set("User-Version", "v1")
	return res, nil
}

func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization, Connect-Protocol-Version")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}

func main() {
	server := &UserServer{}
	mux := http.NewServeMux()
	path, handler := userv1connect.NewUserServiceHandler(server)
	mux.Handle(path, handler)
	
	log.Println("Starting server on :8080...")
	http.ListenAndServe(
		"localhost:8080",
		// Use h2c so we can serve HTTP/2 without TLS.
		h2c.NewHandler(corsMiddleware(mux), &http2.Server{}),
	)
} 