resource "kubernetes_manifest" "todo_app" {
  manifest = {
    apiVersion = "argoproj.io/v1alpha1"
    kind       = "Application"
    metadata = {
      name      = "todo-app"
      namespace = "argocd"
    }
    spec = {
      project = "default"
      source = {
        repoURL        = "https://github.com/ncore-x/todo-app"
        targetRevision = "HEAD"
        path           = "k8s/apps/todo"
      }
      destination = {
        server    = "https://kubernetes.default.svc"
        namespace = "todo"
      }
      syncPolicy = {
        automated = {
          prune    = true
          selfHeal = true
        }
      }
    }
  }

  depends_on = [null_resource.argocd_install, kubernetes_namespace.todo]
}
