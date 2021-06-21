package auth

import(
	"crypto/rand"
	"fmt"
)

func TokenGenerator(n int) string{
	//n * 2 文字のtokenが生成される。
	b :=make([]byte,n)
	rand.Read(b)
	return fmt.Sprintf("%x",b)
}
